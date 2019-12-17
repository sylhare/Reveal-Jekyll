FROM docker.io/sylhare/jekyll:latest

WORKDIR /app
COPY . /app

# Configurations are in _config.yml
RUN echo "Make sure you have a _config.yml" && cat _config.yml

# Create index.html
RUN echo "---" >> index.html
RUN echo "layout: presentation" >> index.html
RUN echo "---" >> index.html
RUN echo "Creating a basic index.html" && cat index.html

# Create Gemfile
RUN echo "source \"https://rubygems.org\"" >> Gemfile
RUN echo "gem 'reveal-jekyll', '~> 0.0.2'" >> Gemfile
RUN echo "Adding the Gemfile" >> cat Gemfile

# Install
RUN bundle install

EXPOSE 4000

CMD ["bundle", "exec", "jekyll", "serve", "--host", "0.0.0.0"]
