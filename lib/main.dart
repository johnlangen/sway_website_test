import 'package:flutter/material.dart';
import 'package:flutter/services.dart'; // Import for SystemChrome
import 'package:flutter_web_plugins/flutter_web_plugins.dart'; // Import for URL strategy
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

void main() {
  // Set the system overlay style for the status and navigation bars
  SystemChrome.setSystemUIOverlayStyle(SystemUiOverlayStyle(
    statusBarColor: Color(0xFF004D40), // Dark green status bar
    statusBarIconBrightness: Brightness.light, // Light icons in the status bar for contrast
    systemNavigationBarColor: Color(0xFF004D40), // Dark green navigation bar
    systemNavigationBarIconBrightness: Brightness.light, // Light icons in the navigation bar for contrast
  ));

  // Use the path URL strategy (removes the # from URLs)
  usePathUrlStrategy(); 

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
      },
    );
  }
}
