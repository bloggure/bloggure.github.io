---
layout: post
category:
title: "SwiftUI UIKit Interop"
tagline:
tags : [xcode, swift, swiftui, uikit]
published: false
comments: true
author: cgatay
---


```swift
class MyViewController: UIViewController{
  // classic stuff
}
```

```swift
extension MyViewController: UIViewControllerRepresentable {
    public typealias UIViewControllerType = CameraViewController

    public func makeUIViewController(context _: UIViewControllerRepresentableContext<CameraViewController>) -> MyViewController {
        self 
    }

    public func updateUIViewController(_: MyViewController, context _: UIViewControllerRepresentableContext<MyViewController>) {}

    static func dismantleUIViewController(_ uiViewController: UIViewControllerType, coordinator _: Coordinator) {
        uiViewController.cancelBag.cancelAll()
    }
}
```

```swift
struct MyView: View {
  var body: some View {
    MyViewController()
  }
}

```
