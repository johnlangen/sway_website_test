import 'package:flutter/material.dart';
import 'package:flutter/services.dart'; // Import for SystemChrome
import 'package:firebase_core/firebase_core.dart'; // Import Firebase core
import 'package:firebase_analytics/firebase_analytics.dart'; // Import Firebase Analytics
import 'package:firebase_analytics/observer.dart'; // Import for tracking screen navigation
import 'pages/home_page.dart';
import 'pages/treatments_page.dart';
import 'pages/gift_cards_page.dart';
import 'pages/join_the_club_page.dart';
import 'pages/the_sway_way_page.dart';
import 'pages/book_now_page.dart';
import 'pages/facials_page.dart';
import 'pages/massages_page.dart';
import 'pages/remedy_tech_page.dart';
import 'pages/terms_and_conditions_page.dart'; // Import Terms and Conditions Page
import 'pages/privacy_policy_page.dart'; // Import Privacy Policy Page

Future<void> main() async {
  // Ensure Firebase is initialized before anything else
  WidgetsFlutterBinding.ensureInitialized();

  // Initialize Firebase with default options
  await Firebase.initializeApp();

  // Set the system overlay style for status and navigation bars
  SystemChrome.setSystemUIOverlayStyle(SystemUiOverlayStyle(
    statusBarColor: Color(0xFF004D40),
    statusBarIconBrightness: Brightness.light, // Light icons for better contrast
    systemNavigationBarColor: Color(0xFF004D40),
    systemNavigationBarIconBrightness: Brightness.light, // Light icons for navigation bar
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
        primarySwatch: Colors.green, // You can modify the theme as needed
      ),
      navigatorObservers: <NavigatorObserver>[observer], // Attach Firebase Analytics observer
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
