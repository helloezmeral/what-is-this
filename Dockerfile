FROM httpd:2.4

RUN apt update && apt upgrade -y && apt install -y git

RUN git clone https://github.com/helloezmeral/what-is-this

RUN mv ./what-is-this/html/* /usr/local/apache2/htdocs

RUN rm ./what-is-this/ -r

RUN sed -i \
        -e 's/^#\(Include .*httpd-ssl.conf\)/\1/' \
        -e 's/^#\(LoadModule .*mod_ssl.so\)/\1/' \
        -e 's/^#\(LoadModule .*mod_socache_shmcb.so\)/\1/' \
        conf/httpd.conf