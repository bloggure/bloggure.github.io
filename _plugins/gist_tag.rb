# frozen_string_literal: true

module Jekyll
  class GistTag < Liquid::Tag
    def initialize(tag_name, markup, tokens)
      super
      @gist_id = markup.strip
    end

    def render(context)
      "<script src=\"https://gist.github.com/#{@gist_id}.js\"></script>"
    end
  end
end

Liquid::Template.register_tag('gist', Jekyll::GistTag)