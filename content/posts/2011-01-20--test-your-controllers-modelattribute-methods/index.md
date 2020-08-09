---
title: Test your Controller's ModelAttribute methods.
menuTitle: Test your Controller's ModelAttribute methods.
subTitle: Injecting a ModelAttribute to the controller's method in Unit tests using Spring and jUnit.
postDescription: Injecting a ModelAttribute to the controller's method in Unit tests using Spring and jUnit.
category: Assertion
---
I was about to write some unit tests around my Spring’s controller classes and also i wanted to write the test using MockHttpRequest and MockHttpResponse.

My controller had a method to which i was using ModelAttribute as one of the parameter. I just want to simulate the same scenario in my Unit Tests.

Unfortunately i could not see any methods in MockHttpRequest to help me with this. So i had to take a simple different approach as an workaround for this.

My Controller code looks similar to this:

@Controller
@RequestMapping(value = "/register")
public class MyController {
    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public ModelAndView save(@ModelAttribute User user) {
        //Code to save the User object
        return new ModelAndView();
    }
}

My Unit Tests:

public class MyControllerTest {
    MockHttpServletResponse response;
    MockHttpServletRequest request;
    AnnotationMethodHandlerAdapter handler;

    @Before
    public final void init() {
        response = new MockHttpServletResponse();
        request = new MockHttpServletRequest();
        handler = new AnnotationMethodHandlerAdapter();
    }

    @Test
    public void shouldTestSaveUser() {
        final User mockUser = new UserTestBuilder().withName("John").build();
        request.setMethod("POST");
        request.setRequestURI("/register/save");

        MyController myController = new MyController() {
            @ModelAttribute
            public User mockModel() {
                return user;
            }
        }
        ModelAndView model = handler.handle(request, response, myController);
    }
}

_**Explanation:**_

Whenever a method in a controller is annotated with @ModelAttribute , it will be invoked for every request made to that controller. So while creating the mycontroller object i am overriding a sample method which has this annotation and returns a User object as a ModelAttribute.