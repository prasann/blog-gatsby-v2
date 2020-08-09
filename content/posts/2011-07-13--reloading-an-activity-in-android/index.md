---
title: Reloading an activity in Android
subTitle: Manually reloading activity in Android application.
postDescription: Refreshing or reloading activity in Android application. This might be important in the case of refreshing data in the activity.
category: Android
---
More often i wanted to reload an activity to refresh the contents of an page. I have seen many ways to do this in Android world and i always puzzled about the best approach.

However these are some of the approaches that i took . I found the following two approaches a lot cleaner as they kill the existing intent and restart.

**Approach 1:**

```java
Intent intent = getIntent();
finish();
startActivity(intent);
```

**Approach 2:**
```java
Intent intent = getIntent();
overridePendingTransition(0, 0);
intent.addFlags(Intent.FLAG\_ACTIVITY\_NO\_ANIMATION);
finish();
overridePendingTransition(0, 0);
startActivity(intent);
```
_**Note:** The second approach works only from API 5+_