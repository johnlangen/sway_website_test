import 'package:flutter/material.dart';
import '../widgets/nav_bar.dart';

class TheSwayWayPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: PreferredSize(
        preferredSize: Size.fromHeight(50),
        child: NavBar(),
      ),
      body: Center(
        child: Text(
          'The Sway Way Page',
          style: TextStyle(fontSize: 24),
        ),
      ),
    );
  }
}
