---
title: Re running testNG failed times n times.
menuTitle: Re running testNG failed times n times.
subTitle: Steps to set up re-runn of testNG failed tests for n number of times, using ant task.
postDescription: Steps to set up re-runn of testNG failed tests for n number of times, using ant task.
category: Tech,Testing
---
We were running our Selenium functional tests using [testNG](http://testng.org/doc/index.html) runner in [Jenkins](http://jenkins-ci.org/). However the problem was we were having too many failures on our initial run, and lot of these failures were classified as random or not reproducable. Mainly these are test script issues. Some times the testers tend to put some static wait conditions which might work on their machine but not in the Jenkins agent. Sometimes the environment against which our tests run might be a bit slow which pushes our pass percentage well behind. The ideal appropriate fix will be is to go through the failed test cases and figure out the randomness and fix it. But we thought of adding a re run mechanism to our test job to identify these random failures. As the no. of test cases grew, we ended up in re running the failed tests multiple times, something like this.

Name

Total

Failed

Initial run

100

30

ReRun1

30

20

ReRun2

20

10

In this case we will interpret the last 10 failures as a legitimate failures and rest as intermittent ones. 

Please note that this is not a correct approach to reduce the failure count. This make the testers more lazy since they always analyse only the failed tests in the final run. And this increases the running time of the job inadvertently since the sure fail cases runs for n times and failing always.

### Re Running testNG failed tests using ANT

After every test run, testng will create a file called testng-failed.xml in the report directory which will contain the failed tests of that run. There was an issue with this file however. If you define multiple suites in your initial test suite file then this outer testng-failed.xml will contain the failed tests of the first run alone. The remaining suite's failed tests will be in the inner directories under their corresponding suite names.

This testng-failed.xml will also inherit all the properties from the original test suite file. For example if we have defined thread-count value then the same value will be retained.

So what I did was copied this file to a location and fed this to the testng task to run again. This can be achieved by any means, since we were using ant as our build tool i configured this in our build.xml file itself.

	<target name="runTests" depends="compile" description="Running tests">
		<echo>Running Tests...</echo>
		<taskdef resource="testngtasks" classpath="lib/testng-6.8.jar" />
		<testng outputDir="${report.dir}" useDefaultListeners="true" classpathref="build.classpath" 
			listeners="org.uncommons.reportng.HTMLReporter,org.uncommons.reportng.JUnitXMLReporter">
			<classpath location="${class.dir}" />
			<xmlfileset dir="." includes="testng-suite.xml" />
			<sysproperty key="org.uncommons.reportng.title" value=" Test report" />
			<sysproperty key="properties" value="${properties}" />
		</testng>
		<copy file="${report.dir}/testng-failed.xml" todir="${basedir}/test-output-rerun/0"/>
		
		<antcall target="multiReRun"/>
	</target>
	<target name="multiReRun" description="Multiple rerun tests">
		<antcall target="runFailedTests">
			<param name="rerun.report.dir" value="${rerun.base.dir}/1"/>
			<param name="src.rerun.dir" value="${rerun.base.dir}/0"/>
		</antcall>
		<antcall target="runFailedTests">
			<param name="rerun.report.dir" value="${rerun.base.dir}/2"/>
			<param name="src.rerun.dir" value="${rerun.base.dir}/1"/>
		</antcall>
	</target>
	

Here output folder of the init run will be test-output. And am copying testng-failed.xml from test-output to test-output-rerun/0 . This is just to make my multiReRun more convenient. Now i have repeated the block of code for two times. This is due to the fact that ant doesn't support the regular for..counter loop.

When i went through some ant docs figured out that ant script supports JavaScript!! May be i can use that to constuct a string like "1,2,3,4,5" and pass it onto the for loop of ant.