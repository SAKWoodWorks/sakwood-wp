FROM wordpress:latest

# Install WP-CLI for WordPress management
RUN apt-get update && apt-get install -y curl sudo less && \
    curl -o /tmp/wp-cli.phar https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar && \
    chmod +x /tmp/wp-cli.phar && \
    mv /tmp/wp-cli.phar /usr/local/bin/wp && \
    wp --info

# Create a custom PHP configuration file
# Increases Max Execution Time to 600 seconds (10 minutes)
# Increases Memory Limit to 256MB
RUN echo "file_uploads = On\n" \
         "memory_limit = 256M\n" \
         "upload_max_filesize = 128M\n" \
         "post_max_size = 128M\n" \
         "max_execution_time = 600\n" \
         "max_input_time = 600\n" \
         > /usr/local/etc/php/conf.d/uploads.ini
