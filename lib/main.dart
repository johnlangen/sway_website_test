import 'package:flutter/material.dart';
import 'pages/home_page.dart';
import 'pages/treatments_page.dart';
import 'pages/gift_cards_page.dart';
import 'pages/join_the_club_page.dart';
import 'pages/the_sway_way_page.dart';
import 'pages/book_now_page.dart';
import 'pages/facials_page.dart';
import 'pages/massages_page.dart';
import 'pages/remedy_tech_page.dart';
import 'pages/terms_and_conditions_page.dart';  // Import Terms and Conditions Page
import 'pages/privacy_policy_page.dart';  // Import Privacy Policy Page

void main() {
  runApp(SwayWebsiteApp());
}

class SwayWebsiteApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Sway Website',
      theme: ThemeData(
        primarySwatch: Colors.green,
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
        '/terms-and-conditions': (context) => TermsAndConditionsPage(),  // Add route for Terms and Conditions
        '/privacy-policy': (context) => PrivacyPolicyPage(),  // Add route for Privacy Policy
      },
    );
  }
}
