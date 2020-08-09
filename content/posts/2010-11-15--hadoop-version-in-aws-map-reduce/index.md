---
title: Hadoop Version in AWS Map Reduce
menuTitle: Hadoop Version in AWS Map Reduce
subTitle: Performing Map Reduce operation using Amazon AWS interface.
postDescription: Performing Map Reduce operation using Amazon AWS interface.
category: Tech,Java
---
Creating job flows using AWS MapReduce's GUI is pretty simple and very straight forward. But i wanted to use Java SDK to create/run jobs in MapReduce. I could successfully able set up the job and configured all the parameters except for a weird error.

java.lang.NoSuchMethodError:
org.apache.hadoop.mapred.JobConf.
setBooleanIfUnset(Ljava/lang/String;Z)V

I was constantly getting this error while running the job. Initially i had no idea why this error occurs and none of the forum talks about it either. Then i figured out that the default Hadoop version used by the Ec2 instances was 0.18 and i was expecting 0.20. Interestingly i didn't face this issue when i did it through GUI.

As a solution i need to explicitly set the version number as 0.20 to the Instances object so that it will use the same while running the job.

JobFlowInstancesConfig instances = new JobFlowInstancesConfig();
instances.setHadoopVersion("0.20");