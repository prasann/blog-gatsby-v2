---
title: Writing Custom Tags for JSTLs
menuTitle: Writing Custom Tags for JSTLs
subTitle: Writing a custom JSTL tag and integrating with the application. A sample code to do the same.
postDescription: Writing a custom JSTL tag and integrating with the application. A sample code to do the same.
category: Tech,Java
---
First start with writing a tag library descriptor(TLD). A TLD is a XML document that contains information about a library as a whole and about each tag contained in the library.  
The structure of the TLD file is pretty readalbe.

Below is an implementation of tag which takes in a section name(value) of a web page and checks whether the logged-in user has rights to view the section.

**Step 1:** custom.tld

<?xml version="1.0" encoding="ISO-8859-1" ?>
<!DOCTYPE taglib PUBLIC "-//Sun Microsystems, Inc.//DTD JSP Tag Library 1.1//EN"
        "http://java.sun.com/j2ee/dtds/web-jsptaglibrary\_1\_1.dtd">
<taglib xmlns="http://java.sun.com/j2ee/dtds/web-jsptaglibrary\_1\_1.dtd">
    <tlibversion>1.0</tlibversion>
    <jspversion>1.1</jspversion>
    <shortname>custom</shortname>
    <info>Custom tag library</info>
    <tag>
        <name>permission</name>
        <tagclass>com.prasans.PermissionTag</tagclass>
        <info>
            Checks the User Permission to access the content.
        </info>
        <attribute>
            <name>value</name>
            <required>true</required>
        </attribute>
        <attribute>
            <name>invertCondition</name>
            <required>false</required>
        </attribute>
    </tag>
</taglib>

Here we have implemented a tag called permission within the 'custom' tag library.

Usage: _<custom:permission value="">{section}</custom:permission>_  
Similarly you can add more tags to your library by adding more <tag> nodes.

After done with defining TLD, next step is to implement the conditional logic. Below is a piece of Java code that does the implementation of the TLD.

**Step 2:** PermissionTag.java

package com.prasans;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.jsp.jstl.core.ConditionalTagSupport;

public class PermissionTag extends ConditionalTagSupport {
    private String value = null;
    private boolean invertCondition;

    public void setValue(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    public boolean isInvertCondition() {
        return invertCondition;
    }

    public void setInvertCondition(boolean invertCondition) {
        this.invertCondition = invertCondition;
    }

    @Override
    protected boolean condition() {
        // If needed you can access Request Object like this.
        HttpServletRequest request = (HttpServletRequest) pageContext.getRequest();
        boolean permission = checkForThePermission(value);
        return invertCondition ? !permission : permission;
    }
}

**Explanation:**

\* Since the expectation of this tag is to return true or false, we are extending the _ConditionalTagSupport_ class. Based on the need you can choose upon your class implementation.

\*Note that all tag attributes are member variables of the class and all of them should have getters and setters.

\*Here we have overridden the condition() from ConditionalTagSupport to return the needed boolean result.

\* InvertCondition is an attribute that helps us in simulating negative scenarios.

For ex: "Show the section _If User A do not have 'X' permission_"

After building the TLD and its corresponding logic, the next step is to integrate with your application.  
Add the custome tag library to your web.xml to integrate with your web app.

**Step 3:** web.xml

<jsp-config>
    <taglib>
        <taglib-uri>/custom</taglib-uri>
        <taglib-location>/WEB-INF/tags/custom.tld</taglib-location>
    </taglib>
</jsp-config>

The taglib-uri is the _<shortname>_ defined in the TLD file. And _<taglib-location>_ is the location of the tld. Make sure that you are bundling the TLD along with your WAR.

Thats it. You can start using your custom tags in your JSPs now.