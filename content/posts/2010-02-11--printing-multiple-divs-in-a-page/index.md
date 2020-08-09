---
title: Printing multiple divs in a page.
menuTitle: Printing multiple divs in a page.
subTitle: When an user tries to print a HTML page, allow multiple divs from the page to appear in the print and not the entire page. Not using media CSS query
postDescription: When an user tries to print a HTML page, allow multiple divs from the page to appear in the print and not the entire page. Not using media CSS query
category: Tech,Javascript
---
I stumbled upon a situation where i have to print multiple sections of a page into a single document. I actually tried out my own javascript to render only the required divs into an iframe and then the idea is to print that iframe calling _window.print()_ in that iframe.

Having limited Javascript knowledge the above mentioned task was a bit tedious to me , then i sat upon googling to get a ready made plugin that implements this feature and my search ended upon [Jqprint](http://plugins.jquery.com/project/jqPrint). Jqprint is a plugin written in Jquery and it does the same that i mentioned above. Using this jqprint was really very easy. what all you need to do is that just mark all the divs that you want to print with a specific class name or with id. If your classname is printdiv then all you need to do is just call  _$(".printdiv").jqprint();_