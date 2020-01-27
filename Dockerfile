FROM sylhare/jekyll:latest

WORKDIR /app
COPY . /app

# To run using the theme as the gem, creating default files automatically
# ---
# Configurations are in _config.yml
RUN echo "Make sure you have a _config.yml" && cat _config.yml
RUN echo "theme: reveal-jekyll" >> /app/_config.yml

# Create index.html
RUN echo "---" >> /app/index.html
RUN echo "layout: presentation" >> /app/index.html
RUN echo "---" >> /app/index.html
RUN echo "Creating a basic index.html" && cat /app/index.html

# Create Gemfile
RUN echo "Adding the Gemfile"
RUN echo "source \"https://rubygems.org\"" >> /app/Gemfile
RUN echo "gem 'reveal-jekyll', '~> 0.0.4'" >> /app/Gemfile
# ---

# Install dependencies
RUN bundle install

EXPOSE 4000

# docker run -p 4000:4000 <image_name>
CMD ["bundle", "exec", "jekyll", "serve", "--host", "0.0.0.0"]
