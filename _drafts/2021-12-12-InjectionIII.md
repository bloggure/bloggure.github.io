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