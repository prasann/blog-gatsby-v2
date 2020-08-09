---
title: Handle MaxUpload SizeExceededException in Spring
menuTitle: Handle MaxUpload SizeExceededException in Spring
subTitle: Handling MaxUploadExceedException in Ajax call with Spring controllers. This exception occurs when the file size greate than what is expected is been uploaded by the user.
postDescription: Handling MaxUploadExceedException in Ajax call with Spring controllers. This exception occurs when the file size greate than what is expected is been uploaded by the user.
category: Java,Tech
---
I was doing a AJAX file upload using jQuery and Spring 3. Spring provides a way to limit the file being uploaded and this can be configured while creating the multipart bean by specifying the maxUploadSize parameter.

So whenever an user tries to upload a file with size size greater than that of the specified one then Spring will throw _'MaxUploadSizeExceededException'_ exception and returns back. The problem for me is that i was doing the file upload using AJAX so i wanted a custom error to be thrown rather than the Spring's default error.

And also because of this exception the control will not even reach your specified controller so there is no chance to catch it in your Controller. After some lookup i found this simple fix for it.

FileUploadController: Controller which will handle the file upload request.

_**Make this FileUploadController to implement HandlerExceptionResolver. This will force you to define resolveException() method.**_

    
  @ResponseBody
  public ModelAndView resolveException(HttpServletRequest httpServletRequest, 
            HttpServletResponse httpServletResponse, Object o, Exception e) {
      if (e instanceof MaxUploadSizeExceededException) {
          ModelAndView modelAndView = new ModelAndView("inline-error");
          modelAndView.addObject("error", "Error: Your file size is too large to upload. 
                    Please upload a file of size < 5MB and continue.");
          return modelAndView;
      }
      e.printStackTrace();
      return new ModelAndView("500");
  }

** How to show the error on the same page:**

The call to the controller is from a jQuery ajax method. But the problem here is that even with this approach your jQuery POST method is going to receive a HTTP\_OK message from the controller. Hence if you are waiting at the error callback then you have no chance of catching this error.

So what i have done here is to return inline-error view back as the response. On the success callback of the jQuery i check for the presence of the error\_div in the response and display the field in the page. Else show the success message.

_inline-error.jsp_

<div class="error" id="error\_div">${error}</div>

_PS: This is definitely not the cleanest approach, but this solved my problem :)_