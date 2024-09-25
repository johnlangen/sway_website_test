import 'package:flutter/material.dart';
import 'package:flutter/services.dart'; // For SystemChrome
import 'package:firebase_core/firebase_core.dart'; // Firebase core
import 'package:firebase_analytics/firebase_analytics.dart'; // Firebase analytics
import 'package:firebase_analytics/observer.dart'; // For tracking screen navigation

import 'pages/home_page.dart';
import 'pages/treatments_page.dart';
import 'pages/gift_cards_page.dart';
import 'pages/join_the_club_page.dart';
import 'pages/the_sway_way_page.dart';
import 'pages/book_now_page.dart';
import 'pages/facials_page.dart';
import 'pages/massages_page.dart';
import 'pages/remedy_tech_page.dart';
import 'pages/terms_and_conditions_page.dart'; // Terms and Conditions Page
import 'pages/privacy_policy_page.dart'; // Privacy Policy Page

Future<void> main() async {
  // Ensure that Firebase is initialized before the app starts
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(); // Initialize Firebase

  // Set the system overlay style for the status and navigation bars
  SystemChrome.setSystemUIOverlayStyle(SystemUiOverlayStyle(
    statusBarColor: Color(0xFF004D40), // Dark green status bar
    statusBarIconBrightness: Brightness.light, // Light icons in the status bar for contrast
    systemNavigationBarColor: Color(0xFF004D40), // Dark green navigation bar
    systemNavigationBarIconBrightness: Brightness.light, // Light icons in the navigation bar for contrast
  ));

  runApp(SwayWebsiteApp());
}

class SwayWebsiteApp extends StatelessWidget {
  // Create an instance of FirebaseAnalytics
  static FirebaseAnalytics analytics = FirebaseAnalytics.instance;
  static FirebaseAnalyticsObserver observer = FirebaseAnalyticsObserver(analytics: analytics);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Sway Website',
      theme: ThemeData(
        primarySwatch: Colors.green, // Customize theme as needed
      ),
      // Use FirebaseAnalyticsObserver for tracking screen navigation
      navigatorObservers: <NavigatorObserver>[observer],
      initialRoute: '/',
      routes: {
        '/': (context) => HomePage(),
        '/treatments': (context) => TreatmentsPage(),
        '/gift-cards': (context) => GiftCardsPage(),
        '/membership': (context) => JoinTheClubPage(),
        '/the-sway-way': (context) => TheSwayWayPage(),
        '/book-now': (context) => BookNowPage(),
        '/facials': (context) => FacialsPage(),
        '/massages': (context) => MassagesPage(),
        '/remedy-tech': (context) => RemedyTechPage(),
        '/terms-and-conditions': (context) => TermsAndConditionsPage(),
        '/privacy-policy': (context) => PrivacyPolicyPage(),
      },
    );
  }
}
