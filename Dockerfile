FROM node:10.15.3

ENV PORT=3030
ENV NODE_ENV=production

WORKDIR /srv/app

COPY ./ /srv/app


RUN npm install
# RUN make build-prod

CMD make server