---
title: Logging in Golang projects
subTitle: Writing a generic log layer log common log information.
postDescription: A log abstraction in go-lang projects, that can then be used to log common information. This also hides the log library inclusion, making it easier to swap out the library for a different one.
category: Go
draft: false
---

One of the common requirement in any project is to have some additional context while logging. And most of us aren't consuming the logs directly these days.
We use either ELK stack or some other proprietary tools to consume the logged information.
In these cases, it's important to know where those logs specifically came from and also important to log it in a format that's easy to parse and index.

In our case, we were using splunk and we have built a lots of dashboards based on Splunk logs. So our convention is to log in JSON format and also to log machine information and some more environment based information.

Here is the post describing how we achieved it using go-lang.


## Setting up an abstraction for logging

We decided to go with logrus as our logging library. Instead of using and importing logrus in all the places, we wrote a layer of abstraction.

This layer, then exposes various public functions to be consumed by the actual callers. So the logrus usage, is hidden and can be later changed too

In this layer, we can then inject common variables that needs to be logged as part of all log statements.

## Logging the caller

The moment we introduce the abstraction, we have introduced a problem of losing the actual log position. logrus will log the abstraction layer as the log position for all log statement.

So, here we are logging the caller as "ContextLogTag". The caller will be then identified using the  go runtime. We can navigate through the stack in the go runtime to log the caller.

Here is the code for does that

```go
func getCallerInfo() string {
	_, filePath, lineNo, isOk := runtime.Caller(2)
	if isOk {
		pathArray := strings.Split(filePath, "/")
		fileName := pathArray[len(pathArray)-1]
		return fmt.Sprintf("%s#%d", fileName, lineNo)
	} else {
		return ""
	}
}
```


Here is our abstraction layer.

```go
package logger

import (
	"fmt"
	"github.com/sirupsen/logrus"
	"log"
	"os"
	"runtime"
	"strings"
)

var logger *logrus.Logger

type Fields map[string]interface{}

const (
	contextLogTag     string = "ContextLogTag"
	errorLogTag       string = "ErrorLogTag"
	deviceLogTag      string = "Device ID"
)

var logEntry *logrus.Entry

func Setup() {
	level, err := logrus.ParseLevel("<<loglevel from env>>")
	if err != nil {
		log.Fatalf(err.Error())
	}

	logger = &logrus.Logger{
		Out:   os.Stdout,
		Level: level,
	}
	logger.Formatter = &logrus.JSONFormatter{}

	logEntry = logger.WithFields(logrus.Fields{
		deviceLogTag:      "<<deviceId from env>>",
	})
}

func Error(errMessage string, err error, fields map[string]interface{}) {

	if fields != nil {
		for key, val := range fields {
			logEntry = logEntry.WithField(key, val)
		}
	}
	logEntry.
		WithField(contextLogTag, getCallerInfo()).
		WithField(errorLogTag, err).
		Error(errMessage)
}

func Fatal(errMessage string, err error, fields map[string]interface{}) {
	if fields != nil {
		for key, val := range fields {
			logEntry = logEntry.WithField(key, val)
		}
	}
	logEntry.
		WithField(contextLogTag, getCallerInfo()).
		WithField(errorLogTag, err).
		Fatal(errMessage)
}

func Info(msg string, fields map[string]interface{}) {
	if fields != nil {
		for key, val := range fields {
			logEntry = logEntry.WithField(key, val)
		}
	}
	logEntry.WithField(contextLogTag, getCallerInfo()).Info(msg)
}

func Warn(fields map[string]interface{}, args ...interface{}) {
	if fields != nil {
		for key, val := range fields {
			logEntry = logEntry.WithField(key, val)
		}
	}
	logEntry.Warn(args...)
}

func getCallerInfo() string {
	_, filePath, lineNo, isOk := runtime.Caller(2)
	if isOk {
		pathArray := strings.Split(filePath, "/")
		fileName := pathArray[len(pathArray)-1]
		return fmt.Sprintf("%s#%d", fileName, lineNo)
	} else {
		return ""
	}
}
```




  
