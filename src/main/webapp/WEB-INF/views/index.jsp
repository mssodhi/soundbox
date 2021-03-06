<head>
    <meta charset='utf-8'>
    <meta http-equiv="X-UA-Compatible" content="chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <link rel="stylesheet" type="text/css" href="resources/css/bootstrap.css">
    <link rel="stylesheet" type="text/css" href="resources/css/bootstrap-social.css">
    <link rel="stylesheet" type="text/css" href="resources/css/faa-animations.css">
    <link rel="stylesheet" type="text/css" href="resources/css/font-awesome.min.css">
    <link rel="stylesheet" type="text/css" href="resources/css/nav.css">
    <link rel="stylesheet" type="text/css" href="resources/css/material-tabs.css">
    <link rel="shortcut icon" href="resources/images/sodhi_designs_logo.png">
    <title>SoundBox</title>
</head>
<body ng-app="app">
<div ng-include="'resources/scripts/controllers/nav/nav.html'"></div>
<main ng-view></main>

</body>
<%-- Angular injects --%>
<script src="resources/js/angular.min.js"></script>
<script src="resources/js/angular-route.min.js"></script>
<script src="resources/js/angular-resource.min.js"></script>
<script src="resources/js/angular-animate.min.js"></script>
<script src="resources/js/angulartics.min.js"></script>
<script src="resources/js/angulartics-ga.min.js"></script>
<%-- Angular injects --%>

<%-- Third part injects --%>
<script src="resources/js/fb.js"></script>
<script src="resources/js/lodash.min.js"></script>
<script src="resources/js/moment.min.js"></script>
<script src="resources/js/ui-bootstrap-1.3.3.min.js"></script>
<script src="resources/js/ng-file-upload.min.js"></script>
<%--<script src="resources/js/sc-sdk-3.1.1.js"></script>--%>
<%--<script src="resources/js/MD5.js"></script>--%>
<%-- Third Party injects --%>

<%-- SoundBox --%>
<script src="resources/scripts/app.js"></script>

<%-- Services --%>
<script src="resources/scripts/services/album.service.js"></script>
<script src="resources/scripts/services/analytics.service.js"></script>
<script src="resources/scripts/services/charts.service.js"></script>
<script src="resources/scripts/services/comments.service.js"></script>
<script src="resources/scripts/services/credentials.service.js"></script>
<script src="resources/scripts/services/follow.service.js"></script>
<script src="resources/scripts/services/likes.service.js"></script>
<script src="resources/scripts/services/login.service.js"></script>
<script src="resources/scripts/services/music-service.js"></script>
<script src="resources/scripts/services/page.service.js"></script>
<script src="resources/scripts/services/permission.js"></script>
<script src="resources/scripts/services/playlist.service.js"></script>
<script src="resources/scripts/services/recommend.service.js"></script>
<script src="resources/scripts/services/search.service.js"></script>
<script src="resources/scripts/services/settings.service.js"></script>
<script src="resources/scripts/services/song.service.js"></script>
<script src="resources/scripts/services/user.service.js"></script>
<%-- Services --%>

<%-- Directive --%>
<script src="resources/scripts/directives/auto-focus.js"></script>
<script src="resources/scripts/directives/circle-check.js"></script>
<script src="resources/scripts/directives/circle-error.js"></script>
<script src="resources/scripts/directives/ng-enter.js"></script>
<%-- Directive --%>

<%-- Components --%>
<script src="resources/scripts/components/comments/comments-card.js"></script>
<script src="resources/scripts/components/common/common-modal.js"></script>
<script src="resources/scripts/components/dashboard/dashboard.js"></script>
<script src="resources/scripts/components/following-card/following-card.js"></script>
<script src="resources/scripts/components/music-player/music-player.js"></script>
<script src="resources/scripts/components/music-table/music-table.js"></script>
<script src="resources/scripts/components/playlist-card/playlist-card.js"></script>
<script src="resources/scripts/components/search/search-bar.js"></script>
<script src="resources/scripts/components/upload-music/upload-music.js"></script>
<%-- Components --%>

<%-- Controllers --%>
<script src="resources/scripts/controllers/artist/artist.js"></script>
<script src="resources/scripts/controllers/analytics/analytics.js"></script>
<script src="resources/scripts/controllers/browse/browse.js"></script>
<script src="resources/scripts/controllers/charts/charts.js"></script>
<script src="resources/scripts/controllers/landing/landing.js"></script>
<script src="resources/scripts/controllers/login/login.js"></script>
<script src="resources/scripts/controllers/manage/manage.js"></script>
<script src="resources/scripts/controllers/nav/nav.js"></script>
<script src="resources/scripts/controllers/playlist/playlist.js"></script>
<script src="resources/scripts/controllers/settings/settings.js"></script>
<%--<script src="resources/scripts/controllers/upload/upload-view.js"></script>--%>
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