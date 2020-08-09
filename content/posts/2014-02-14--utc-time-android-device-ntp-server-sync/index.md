---
title: UTC time in Android device. With NTP server sync.
menuTitle: UTC time in Android device. With NTP server sync.
subTitle: Using NTP time in the anroid application. This involves calling the SNTP server and also converting the time to UTC format.
postDescription: Using NTP time in the anroid application. This involves calling the SNTP server and also converting the time to UTC format.
category: android,
---
I had a requirement to persist the current UTC time of a request in Android device for future reference.

Getting the time from the Android device and converting it to UTC will not be efficient since, user might have set wrong time in the device and it might mislead the data.  
So we decided to sync the device with NTP server before converting the time to UTC.

**Step 1 :** Copy this [SntpClient.java](https://gist.github.com/prasann/9003350 "SntpClient.java") into your source.  
**Step 2 :** The SntpService.java to compute the current UTC is here below.

public String getUTCTime(){
        long nowAsPerDeviceTimeZone = 0;
        SntpClient sntpClient = new SntpClient();

        if (sntpClient.requestTime("0.africa.pool.ntp.org", 30000)) {
            nowAsPerDeviceTimeZone = sntpClient.getNtpTime();
            Calendar cal = Calendar.getInstance();
            TimeZone timeZoneInDevice = cal.getTimeZone();
            int differentialOfTimeZones = timeZoneInDevice.getOffset(System.currentTimeMillis());
            nowAsPerDeviceTimeZone -= differentialOfTimeZones;
        }
        return DateUtils.getFormattedDateTime(new Date(nowAsPerDeviceTimeZone));
    }

Some more details on SntpService code:

Connect to any of the prominent ntp servers. There were lots of recommendation to place this in config file, however i thought it doesn't make sense for Android since i have to repackage this anyways.

sntpClient.getNtpTime()

gives you the current NTP time as per the device time zone.

Then identify the device's time zone,

cal.getTimeZone()

and calculate the offset difference between UTC and the current device time.

DateUtils.getFormattedDateTime(date)

is our custom method to format date into String.