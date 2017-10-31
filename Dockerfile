FROM handymoose/rpi:node.v6.9.4

RUN apt-get -q update && \  
    apt-get -qy install python python-gpiozero python-rpi.gpio && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /root/

COPY package.json /root/

RUN npm install

COPY index.js /root/
COPY bin /root/bin/
COPY etc /root/etc/
COPY lib /root/lib/


CMD node index.js
