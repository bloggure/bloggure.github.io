---
layout: post
category:
title: "Dark Mode iOS Snapshot"
tagline:
tags : [ios, dark mode, tip]
published: true
comments: true
author: cgatay
---

# Dark mode support

As you might know, iOS supports Dark mode since iOS 12. 
It is pretty straightforward to implement it by using dynamic colors. Either system provided ones or adjust them using trait collections.

## Dynamically switch

At times, we can not rely on default colors but we have to listen for `traitCollection` changes in order to do what is appropriate for adapting the UI to the mode being active.

It is easy to do by checking current `traitCollection` :
 
 {% highlight swift %}
override func traitCollectionDidChange(_ previousTraitCollection: UITraitCollection?) {
    super.traitCollectionDidChange(previousTraitCollection)

    let userInterfaceStyle = traitCollection.userInterfaceStyle 
    // Either .unspecified, .light, or .dark
}
 {% endhighlight %}

## App switcher tricks

One thing that I was not aware is that iOS switches back and forth
between active mode and the complementary when the app goes to the background :

To have proper representation in application switcher, if the trait collection is changed, the OS takes a screenshot of your app using  `light` and `dark` schemes.

## Consequences

This can lead to subtle problems, in my case, I was loading a specific stylesheet for MapBox, that, when loaded, was registering / refreshing elements on map. Thus, when the app was put to the background, a lot of things were happening, without a clear explanation (and the app was sometimes crashing due to the very fast switching between map stylesheets).

The workaround is rather simple : if the app is in the background we prevent loading the stylesheet, the trade-off is acceptable : the app can display an 
invalid preview in application switcher, but, it is nicer on CPU / Network.