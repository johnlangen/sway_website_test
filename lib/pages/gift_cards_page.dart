import 'package:flutter/material.dart';
import '../widgets/nav_bar.dart';

class GiftCardsPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: PreferredSize(
        preferredSize: Size.fromHeight(50),
        child: NavBar(),
      ),
      body: Center(
        child: Text(
          'Gift Cards Page',
          style: TextStyle(fontSize: 24),
        ),
      ),
    );
  }
}
