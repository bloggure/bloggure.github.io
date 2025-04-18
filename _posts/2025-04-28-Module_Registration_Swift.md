---
layout: post
category:
title: "Swift module registration"
tagline:
tags : [ios, tuist, ioc]
published: true
comments: true
author: cgatay
---

Swift module registration

Let’s modularize our Swift code!



I am using tuist for a while now in my projects. This tool was initially bring into the project’s scope to ease day to day developer operations : no more fiddling with conflicts in xcodeproject files !



### Tuist ?

What is tuist by the way ?

Have you ever booted an iOS project, from a few years things have evolved a bit. 

Before 2020 I’d say we were doomed to using xcworkspace for defining complex projects. 

Cocoapod and Carthage were the cool kids on the block, allowing to download libraries and use them in our beautiful apps. 



After 2020, and still now, Swift development have changed to massively using SPM: the built in dependency management tool baked in the swift toolchain. The process is straightforward and easy to set up, a few clicks in XCode and voila! The other way of using SPM is by using a Package.swift file to describe what you want to achieve. 



The swift file works very well but lacks from a lot of advanced features available in XCode projects. Or if it is possible, it is not convenient to do. 

This is where tuist fills the gap, like Gradle in the Java ecosystem did a few years ago. We can finally use Swift to describe our Swift projects. This means no more copasting things over and over and the dreaded xcodeproj is no more : you’ll only ever have to merge swift files !



## Code modularity appears !

It also came in handy for bringing modularity into our codebase. We managed to split dependencies and make modules per feature or functional scope. 

This comes at a cost, having to register our different modules to our main app. When I’m talking about registering, I’m considering handling dependencies, routing and navigation. This can represent a lot of modules, a lot of useless lines in our codebase.

To be clearer, our main app contains authentication logic as well as basic http interactions, our modules are dumb as they depend on this external provider to be able to issue any http call. 



## First implementation

Every of our module was being added to our ResourceLoader class that would call the necessary initializers to set things in motion like the following 

{% highlight swift %}
func register(){
  LoggingModule.register()
  …
}
{% endhighlight %}

With our ResourceLoader implementing a protocol exposing everything that was useful for our submodules, protocol which was made available through a simple used-everywhere dependency. 

## Auto-registration for the win !

We can do module autoregistration by scanning embedded frameworks. As we can do with IoC, the idea is to let every module declare itself to the main consumer. No more long `register` method in our application launch, and new modules are automatically discovered at launch time !

Let’s illustrate this with some code, we declare a protocol that will allow consumer to call registration for our module.

{% highlight swift %}
public protocol ModuleRegistration {
    func register()
}
{% endhighlight %}

This is our base building block for registration, every module implements `ModuleRegistration` to contribute to the main app.

In every module project, we then set a class that will be responsible for registration. It will implement this specific protocol and be populated by its full name into `Info.plist`. 

{% highlight swift %}
@objc
public class MyFrameworkRegistration: NSObject, ModuleRegistration {
    public func register() {
      // inject into the global context our dependencies
      // for instance we can do
      // Container.register(MyLogging.self, MyLoggingImpl.self)
    }
}
{% endhighlight %}

Please notice important things in this class. It needs to be annotated `@objc`  and inherit from `NSObject` to be discoverable later on. 

The magic being this is that we will declare this class to be our `NSPrincipalClass`  in the `Info.plist` of our framework.

 

To do so, we add the final touch by enriching the `Info.plist` of our module using Tuist project’s description :

{% highlight swift %}
.target(
        name: "MyFramework",
        destinations: .iOS,
        product: .framework,
        bundleId: "org.9h41.ios.modules",
        deploymentTargets: .iOS("16.0"),
        infoPlist: .extendingDefault(with: [
             "NSPrincipalClass": "MyFramework.MyFrameworkRegistration",
        ]),
        sources: .paths(["MyFramework/Sources/**"])
)
{% endhighlight %}



## Main app implementation

Then in our main app, we scan for `NSPrincipalClass` in all of our included bundles , one just need to call the `Modules.autoregister()` method in application startup.

{% highlight swift %}
public enum Modules {
  public static func autoregister() {
          Bundle.allFrameworks.compactMap(\.principalClass)
              .forEach { clazz in
                  autoregister(clazz: clazz)
              }
  }
  static func autoregister(clazz: AnyClass) {
        let instance = clazz.alloc()
        if let module = instance as? ModuleRegistration {
            module.logger.debug("Doing registration for \(clazz)")
            module.register()
        }
    }
}
{% endhighlight %}



Our main app will then scan all included bundles, look for `NSPrincipalClass`, test if it matches the protocol requirement and then calls the registration function. 

The declared dependencies in our frameworks are now properly registered inside our app context, dependency injection system or anything you can imagine.