<head>
    <meta charset='utf-8'>
    <meta http-equiv="X-UA-Compatible" content="chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <link rel="stylesheet" type="text/css" href="resources/css/bootstrap.css">
    <link rel="stylesheet" type="text/css" href="resources/css/bootstrap-social.css">
    <link rel="stylesheet" type="text/css" href="resources/css/faa-animations.css">
    <link rel="stylesheet" type="text/css" href="resources/css/font-awesome.min.css">
    <link rel="shortcut icon" href="resources/images/mainpic.jpeg">
    <title>SoundBox</title>
</head>
<body ng-app="app">
<div ng-include="'resources/scripts/controllers/nav/nav.html'"></div>
<main ng-view></main>

</body>
<%--<script src="http://connect.facebook.net/en_US/all.js"></script>--%>

<%-- Angular injects --%>
<script src="resources/js/angular.min.js"></script>
<script src="resources/js/angular-route.min.js"></script>
<script src="resources/js/angular-resource.min.js"></script>
<script src="resources/js/angular-animate.min.js"></script>
<script src="resources/js/angulartics.min.js"></script>
<script src="resources/js/angulartics-ga.min.js"></script>
<%-- Angular injects --%>

<%-- Third part injects --%>
<script src="resources/js/sc-sdk-3.1.1.js"></script>
<script src="resources/js/lodash.min.js"></script>
<script src="resources/js/moment.min.js"></script>
<script src="resources/js/ui-bootstrap-1.3.3.min.js"></script>
<script src="resources/js/MD5.js"></script>
<%-- Third Party injects --%>

<%-- Sandbox --%>
<script src="resources/scripts/app.js"></script>

<%-- Services --%>
<script src="resources/scripts/services/permission.js"></script>
<script src="resources/scripts/services/user.service.js"></script>
<script src="resources/scripts/services/credentials.service.js"></script>
<script src="resources/scripts/services/music-service.js"></script>
<script src="resources/scripts/services/favorites.service.js"></script>
<script src="resources/scripts/services/playlist.service.js"></script>
<script src="resources/scripts/services/login.service.js"></script>
<script src="resources/scripts/services/settings.service.js"></script>
<%-- Services --%>

<%-- Directive --%>
<script src="resources/scripts/directives/ng-enter.js"></script>
<script src="resources/scripts/directives/auto-focus.js"></script>
<script src="resources/scripts/directives/circle-check.js"></script>
<script src="resources/scripts/directives/circle-error.js"></script>
<%-- Directive --%>

<%-- Components --%>
<script src="resources/scripts/components/music-player/music-player.js"></script>
<script src="resources/scripts/components/favorites/favorites-card.js"></script>
<script src="resources/scripts/components/playlist/playlist-card.js"></script>
<script src="resources/scripts/components/search/search-bar.js"></script>
<script src="resources/scripts/components/music-table/music-table.js"></script>
<script src="resources/scripts/components/common/common-modal.js"></script>
<%-- Components --%>

<%-- Controllers --%>
<script src="resources/scripts/controllers/nav/nav.js"></script>
<script src="resources/scripts/controllers/landing/landing.js"></script>
<script src="resources/scripts/controllers/verify/verify.js"></script>
<script src="resources/scripts/controllers/login/login.js"></script>
<script src="resources/scripts/controllers/artist/artist.js"></script>
<script src="resources/scripts/controllers/playlist/playlist.js"></script>
<%--<script src="resources/scripts/controllers/video/video.js"></script>--%>
<script src="resources/scripts/controllers/profile/profile.js"></script>
<script src="resources/scripts/controllers/browse/browse.js"></script>
<%-- Controllers --%>

<script>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-69819891-2', 'auto');
    ga('send', 'pageview');

</script>
<%-- Sandbox --%>