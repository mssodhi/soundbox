<head>
    <meta charset='utf-8'>
    <meta http-equiv="X-UA-Compatible" content="chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <link href='https://fonts.googleapis.com/css?family=Architects+Daughter' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" type="text/css" href="resources/css/bootstrap.css">
    <link rel="stylesheet" type="text/css" href="resources/css/bootstrap-social.css">
    <link rel="stylesheet" type="text/css" href="resources/css/font-awesome.min.css">
    <link rel="shortcut icon" href="resources/images/mainpic.jpeg">
    <title>SoundBox</title>
</head>
<body ng-app="app">
<div ng-include="'resources/scripts/controllers/nav/nav.html'"></div>
<main ng-view class="container-fluid"></main>

</body>
<%--<script src="http://connect.facebook.net/en_US/all.js"></script>--%>
<script src="https://connect.soundcloud.com/sdk/sdk-3.0.0.js"></script>
<script src="resources/js/angular.min.js"></script>
<script src="resources/js/angular-route.min.js"></script>
<script src="resources/js/angular-resource.min.js"></script>
<script src="resources/js/angular-animate.min.js"></script>
<script src="resources/js/angulartics.min.js"></script>
<script src="resources/js/angulartics-ga.min.js"></script>
<script src="resources/js/lodash.js"></script>
<script src="resources/js/ui-bootstrap-1.2.5.min.js"></script>
<script src="resources/scripts/app.js"></script>
<script src="resources/scripts/factories/local.storage.js"></script>
<script src="resources/scripts/services/permission.js"></script>
<script src="resources/scripts/services/user.service.js"></script>
<script src="resources/scripts/services/media.service.js"></script>
<script src="resources/scripts/services/music-service.js"></script>
<script src="resources/scripts/services/facebook.service.js"></script>
<script src="resources/scripts/services/favorites.service.js"></script>
<script src="resources/scripts/directives/ng-enter.js"></script>
<script src="resources/scripts/controllers/landing/landing.js"></script>
<script src="resources/scripts/controllers/nav/nav.js"></script>
<script src="resources/scripts/controllers/login/login.js"></script>
<script src="resources/scripts/controllers/media/music.js"></script>
<script src="resources/scripts/controllers/media/video.js"></script>
<script src="resources/scripts/controllers/profile/profile.js"></script>