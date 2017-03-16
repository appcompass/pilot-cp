<!doctype html>
<html class="no-js" lang="">
<head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Pilot-io</title>
    <link rel="stylesheet" href="assets/css/app-min.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Noto+Sans:400,700">
    <script src="assets/js/dist/modernizr-custom.js"></script>
</head>
<body>
    <!--[if lt IE 9]>
        <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
    <![endif]-->
    <div class="site">
        <header class="header">
            <div class="header-logo">
                <a href="/"><img src="assets/images/logo.svg" width="26" height="34"></a>
            </div>
            <nav class="header-nav-container">
                <ul class="header-nav header-nav-primary">
                    <li><a href="">Dashboard</a></li>
                    <li>
                        <a href="">Users</a>
                        <ul>
                            <li><a href="">Users</a></li>
                            <li><a href="">Groups</a></li>
                            <li><a href="">Permissions</a></li>
                        </ul>
                    </li>
                    <li><a href="">Sites</a></li>
                    <li><a href="">Media</a></li>
                </ul>
                <ul class="header-nav header-nav-secondary">
                    <li>
                        <div class="header-search">
                            <div class="search-input"><span class="icon-search"></span><input type="search"></span></div>
                        </div>
                    </li>
                    <li>
                        <a href=""><span class="header-profile"><img src="assets/images/avatar_temp.png" width="40px" height="40px"></span></a>
                        <ul>
                            <li><a href="">Profile</a></li>
                            <li><a href="">Logout</a></li>
                        </ul>
                    </li>
                    <li><a href="" class="notifications-toggle"><span class="header-notifications icon-notification"><span class="alert-count">10</span></span></a></li>
                </ul>
            </nav>
        </header>
        <div class="main-container">
            <?php include('sidebar.php'); ?>
            <?php include('notifications.php'); ?>


