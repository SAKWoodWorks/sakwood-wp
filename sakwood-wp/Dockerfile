FROM wordpress:latest

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
