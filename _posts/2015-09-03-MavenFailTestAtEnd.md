---
layout: post
category:
title: "How to get all failing tests for a multimodule Maven project"
tagline:
tags : [java, maven, test, junit, tips]
published: true
comments: true
author: cgatay
---

# Maven testing

One of the bothering thing being a contractor is that you often happen to work on a project with a skip tests flag set on all developers computer. 

One of the thing I tend to do when on such project is enabling tests and trying to fix as much as possible (often the fixes are easy to do). 

## Multi module testing
By design, surefire plugin make the build fail if there is a test failure. 
While this is ok in single module, when working with multi-module project it can be nice to run all tests on all modules regardless of the failures happening in some modules.

Maven is a great tool and allows such a behavior very easily, it allows two command line switches for that : 

 * `--fail-at-end` : will fail the build at the end if there is test failures
 * `--fail-never` : will never fail the build, even if there is test failures

## Flags behavior differences
There is one thing to understand when using the `--fail-at-end` flag, it will fail the build at end for a module with test failure but it will also prevents building of dependent modules.

With a small example it become obvious. Let's say that we have a multi project containing the following :

 * core : containing model objects and services
 * web : containing web views for browser access
 * javafx : containing desktop application classes

It is straightforward to see that `web` and `javafx` modules will depends on the `core` module.

### fail-at-end
If using the `--fail-at-end` flag, a test failure in the core module will prevent building the `web` and `javafx` module completely : you will not be able to track tests failure before fixing the ones from `core` (at least on a single build command).

### fail-never
If using the `--fail-never` flag, a test failure in the `core` module will be reported but the build and tests of the `web` and `javafx` modules will be built and their respective tests errors will also be reported.

## Tired of typing 
If you find that typing `--fail-at-end` is too long, remember yourself it short alias : `-fae`.

The same is also available for the `--fail-never` flag with : `-fn`.
