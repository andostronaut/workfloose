FROM golang:1.19

WORKDIR /usr/src/app

COPY go.* ./

RUN go mod download

RUN go mod verify

COPY . .

RUN go build -v -o /usr/local/bin/app ./..

CMD ["app"]
