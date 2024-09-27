import 'package:flutter/material.dart';
import 'package:flutter/services.dart'; // Import for SystemChrome
import 'package:flutter_web_plugins/flutter_web_plugins.dart'; // Import for URL strategy
import 'package:firebase_core/firebase_core.dart'; // Import Firebase Core
import 'package:firebase_analytics/firebase_analytics.dart'; // Import Firebase Analytics
import 'firebase_options.dart'; // Import the generated firebase_options.dart
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
import 'pages/sauna.dart';
import 'pages/led.dart';
import 'pages/coldplunge.dart';
import 'pages/compression.dart';

// Create an instance of Firebase Analytics
FirebaseAnalytics analytics = FirebaseAnalytics.instance;

Future<void> main() async {
  // Ensure Firebase is initialized before running the app.
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );

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
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Sway Website',
      theme: ThemeData(
        primarySwatch: Colors.green, // You can modify the theme as needed
      ),
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
        '/sauna': (context) => SaunaPage(),
        '/coldplunge': (context) => ColdPlungePage(),
        '/compression': (context) => CompressionPage(),
        '/led': (context) => LEDPage(),
      },
      // Attach the Firebase Analytics observer for screen tracking
      navigatorObservers: [
        FirebaseAnalyticsObserver(analytics: analytics),
      ],
    );
  }
}
