<head>
    <meta charset='utf-8'>
    <meta http-equiv="X-UA-Compatible" content="chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <link rel="stylesheet" type="text/css" href="resources/css/bootstrap.css">
    <link rel="stylesheet" type="text/css" href="resources/css/bootstrap-social.css">
    <link rel="stylesheet" type="text/css" href="resources/css/faa-animations.css">
    <link rel="stylesheet" type="text/css" href="resources/css/font-awesome.min.css">
    <link rel="stylesheet" type="text/css" href="resources/css/nav.css">
    <link rel="shortcut icon" href="resources/images/sodhi_designs_logo.png">
    <title>SoundBox</title>
</head>
<body ng-app="app">
<div ng-include="'resources/scripts/controllers/nav/nav.html'"></div>
<main ng-view></main>
</body>

<!-- inject:js -->
<script src="resources/dist/vendor.js"></script>
<script src="resources/dist/build.js"></script>
<script src="resources/dist/templates.js"></script>
<!-- endinject -->

<script>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-69819891-2', 'auto');
    ga('send', 'pageview');

</script>
<%-- Sandbox --%>