---
layout: post
category:
title: "SwiftUI UIKit Interop"
tagline:
tags : [xcode, swift, swiftui, uikit]
published: true
comments: true
author: cgatay
---

Now that iOS13 is available for more than year, we can start to set it as a lower bound for our deployments.

This allows us to play with all sugar that Apple put in it, one of the biggest thing is the arrival of SwiftUI to supercede UIKit (write cross platform UIs and so on).

## Bridging the two worlds

### Using SwiftUI from UIKit

The first thing we might try to do, is embedding a SwiftUI View inside our `UIViewController` based application. To do so, Apple gives us `UIHostingViewController` which is a simple bridging controller, straightforward to use.

{% highlight swift %}
struct MyNewView: View {
    var view: some View {
        Text("I'm in SwiftUI")
    }
}
class MyNewViewViewController: UIHostingViewController {
    init(){
        super.init(rootView: MyNewView())
    }
}
{% endhighlight %}

### UIViewController in SwiftUI

However, at times we still need to reuse our good old `UIViewController`, either because we can not afford a full SwiftUI rewrite, so we want to keep old code and migrate pieces by pieces or because we are using something not yet adapted to SwiftUI. 

In my case it was using the camera to scan a QRCode.

#### Non elegant solution

I faced a few issue with examples I found out, most of them are adding an extension to the `UIViewController` that makes it conform to `UIViewControllerRepresentable`. 

{% highlight swift %}
class MyViewController: UIViewController{
    var cancellable: Cancellable?
    // classic stuff
}

extension MyViewController: UIViewControllerRepresentable {
    public typealias UIViewControllerType = MyViewController

    public func makeUIViewController(context _: UIViewControllerRepresentableContext<MyViewController>) -> UIViewControllerType {
        self // don't .init() please, class instance is already available
    }

    public func updateUIViewController(_: UIViewControllerType, context _: UIViewControllerRepresentableContext<MyViewController>) {}

    static func dismantleUIViewController(_ uiViewController: UIViewControllerType, coordinator _: Coordinator) {
        uiViewController.cancellable?.cancel()
    }
}

struct MyView: View {
  var body: some View {
    MyViewController()
  }
}
{% endhighlight %}

I find this not easy to read, as we're doing weird thing by returning  `self` from a function named `makeUIViewController`.
Some example are telling to return `MyViewController()` instead of `self`. Please don't do this otherwise you're creating the `UIViewController` twice for each call !

I also had a leak when using  `Combine` (more to come about this great framework), my  `Cancellable`s were never freed, leading in a memory cycle that kept the `UIViewController` living even though it was no longer presented.

It is important to do proper house keeping in the `dismantleUIViewController` method if you don't want to use too much memory and slow down your app.


#### Nice looking way of doing

You will find a working example below, basically we need to implement a `UIViewControllerRepresentable` struct to represent be the container for our `UIViewController` in the SwiftUI world.

{% highlight swift %}
class MyViewController: UIViewController{
    var cancellable: Cancellable?
    // classic stuff
}

struct MyGreatView: UIViewControllerRepresentable {
    public typealias UIViewControllerType = MyViewController

    public func makeUIViewController(context _: UIViewControllerRepresentableContext<MyGreatView>) -> UIViewControllerType {
        MyViewController()
    }

    public func updateUIViewController(_: UIViewControllerType, context _: UIViewControllerRepresentableContext<MyGreatView>) {}

    static func dismantleUIViewController(_ uiViewController: UIViewControllerType, coordinator _: Coordinator) {
        uiViewController.cancellable?.cancel()
    }
}

struct MyView: View {
  var body: some View {
    MyGreatView()
  }
}
{% endhighlight %}