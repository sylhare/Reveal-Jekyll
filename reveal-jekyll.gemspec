# coding: utf-8

Gem::Specification.new do |spec|
  spec.name          = "reveal-jekyll"
  spec.version       = "0.1.0"
  spec.authors       = ["sylhare"]
  spec.email         = ["sylhare@outlook.com"]

  spec.summary       =  "Reveal.js Web presentation served with jekyll"
  spec.description   = %q{Reveal.js Web presentation served with jekyll}
  spec.homepage      = "https://github.com/sylhare/Reveal-Jekyll"
  spec.license       = "MIT"

  spec.rdoc_options            = ["--charset=UTF-8"]
  spec.extra_rdoc_files        = %w(README.md LICENSE)
  spec.metadata["plugin_type"] = "theme"

  spec.files                   = `git ls-files -z`.split("\x0").select do |f|
    f.match(%r!^(assets/(js|css|lib|plugin)/|_(includes|layouts)/|(LICENSE|README.md))!i)
  end

  spec.required_ruby_version   = '>= 2.4.0'
    
  spec.add_runtime_dependency "jekyll", ">= 3.5", "< 5.0"
end
