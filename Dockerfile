FROM node:14

COPY . /

# 초기 커서 위치를 설정할 수 있음
WORKDIR /daengder

RUN yarn install
RUN yarn build

CMD yarn start
