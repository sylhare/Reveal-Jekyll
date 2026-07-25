# Reveal-Jekyll presentation server
# Build:  docker build -t reveal-jekyll .
# Run:    docker run --rm -p 4000:4000 reveal-jekyll
FROM ruby:3.3-slim

# Build tools needed to compile native gem extensions (ffi, sass-embedded, ...)
RUN apt-get update \
    && apt-get install -y --no-install-recommends build-essential git \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Install dependencies first so they are cached across content changes
COPY Gemfile reveal-jekyll.gemspec ./
RUN bundle install

# Copy the presentation itself
COPY . /app

EXPOSE 4000

# Serve the presentation on all interfaces so it is reachable from the host
CMD ["bundle", "exec", "jekyll", "serve", "--host", "0.0.0.0"]
