{% highlight ruby %}
post_install do |installer|
    installer.pods_project.targets.each do |target|
        if target.name == "Pods-festroopers-ios"
            puts "Updating #{target.name} OTHER_LDFLAGS (InjectionIII.app)"
            target.build_configurations.each do |config|
                if config.name == 'Debug'
                  xcconfig_path = config.base_configuration_reference.real_path

                  # read from xcconfig to build_settings dictionary
                  build_settings = Hash[*File.read(xcconfig_path).lines.map{|x| x.split(/\s*=\s*/, 2)}.flatten]

                  # modify OTHER_LDFLAGS
                  build_settings["OTHER_LDFLAGS"].gsub!("\n", "")
                  build_settings['OTHER_LDFLAGS'] << " -Xlinker -interposable\n"

                  # write build_settings dictionary to xcconfig
                  File.open(xcconfig_path, "w") {|file|
                     build_settings.each do |key,value|
                      file.puts("#{key} = #{value}")
                     end
                  }
                end
            end
        end
    end
end
{% endhighlight %}

# InjectionIII.app

## Do you remind JRebel ?

## Chapito

Example
> EventController, change fireDate do Date().addingTimeInterval(5) +s, app to home screen

> AboutController > duplicate version, then save


> Run XProbe, on about eval self.versionTextView.text = "Toto"

> Run method tracing (for package chapito), simply refresh about

> Main.storyboard, play with constraints cross fingers (wait wait wait)

Show how to setup:
 * app install
 * bundle load
 * almost nothings
 * (injected magic)

Limits:
 * only works on simulators
 * sometimes messy with storyboards
 * can do weird things on classes that have a status (store recreate)
 * talk about remote contorl