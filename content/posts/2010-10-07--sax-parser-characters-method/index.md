---
title: SAX parser characters() method.
subTitle: Implementing `characters()` method for SAX parsing huge files. 
postDescription: Sax Parser, behaviour of characters() method. Sample code in Java.
category: Java
---
Was playing around SAX parsing some Gigs of XML file 😅 Here are few learnings from the game.

My intention was to read values between a corresponding tag. I initially went after using characters() in SAX parser which actually worked fine for initial feeds. But as i keep increasing the size of the XMLs and if the size of the tagContent was large the problem arises. characters() function not always gives back the entire value in a single shot. It may return the value in multiple chunks. So need to be careful in assigning and using the values from characters() method.

So the better way to use characters() method is to keep appending all the values to a buffer and use the value in the corresponding end tag section. Also need to make sure that the buffer has to be flushed in the corresponding start element.

**Sample Xml:**
```xml
<Sample>
    <StudentCollection>
        <Student>
            <Name>Jack</Name>
            <Age>12</Age>
        </Student>
        <Student>
            <Name>Jill</Name>
            <Age>13</Age>
        </Student>
        <Student>
            <Name>Rose</Name>
            <Age>14</Age>
        </Student>
    </StudentCollection>
</Sample>
```
**Sample SAX handler code to print the Names:**

**Initial Code: (Works fine for small values & small files)**
```java
public void startElement(String uri, String tag, String qName, Attributes attributes) {
}

public void characters(char ch[], int start, int length) {
  System.out.println("Name of a student: " + new String(ch, start, length));
}

public void endElements(String uri, String tag, String qName) {
}
```
**Final Code:**

```java
public void startElement(String uri, String tag, String qName, Attributes attributes) {
  if ("Name".equals(tag)) {
    tagContentBuffer = new StringBuffer();
  }
}

public void characters(char ch[], int start, int length) {
  tagContentBuffer.append(new String(ch, start, length));
}

public void endElements(String uri, String tag, String qName) {
  if ("Name".equals(tag)) {
    System.out.println("Name of a student: " +
       tagContentBuffer.toString());
  }
}
```