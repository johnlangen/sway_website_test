import 'package:flutter/material.dart';
import '../widgets/nav_bar_green.dart'; // Green nav bar
import '../widgets/footer.dart';
import '../widgets/footer_mobile.dart';
import 'package:url_launcher/url_launcher.dart';

class BookNowPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    bool isMobile = MediaQuery.of(context).size.width < 1000;

    return Scaffold(
      appBar: PreferredSize(
        preferredSize: Size.fromHeight(50),
        child: NavBarGreen(), // Green navigation bar at the top
      ),
      body: Column(
        children: [
          Expanded(
            child: Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text(
                    'Book Now Page',
                    style: TextStyle(
                      fontSize: isMobile ? 32 : 50, // Adjust font size for mobile and desktop
                      fontWeight: FontWeight.w600,
                      color: Color(0xFF113D33),
                    ),
                    textAlign: TextAlign.center,
                  ),
                  SizedBox(height: 40),
                  // "Book Now" button with styling
                  MouseRegion(
                    cursor: SystemMouseCursors.click,
                    child: GestureDetector(
                      onTap: () async {
                        const url = 'https://clients.mindbodyonline.com/classic/ws?studioid=5739770&stype=40&prodId=100';
                        if (await canLaunch(url)) {
                          await launch(url);
                        } else {
                          throw 'Could not launch $url';
                        }
                      },
                      child: AnimatedContainer(
                        duration: Duration(milliseconds: 200),
                        padding: EdgeInsets.symmetric(horizontal: 40, vertical: 20),
                        decoration: BoxDecoration(
                          color: Color(0xFF4A776D), // Green background color
                          borderRadius: BorderRadius.circular(50),
                          boxShadow: [
                            BoxShadow(
                              color: Colors.black26,
                              offset: Offset(0, 4),
                              blurRadius: 10,
                            ),
                          ],
                        ),
                        child: Text(
                          'Book Now',
                          style: TextStyle(
                            color: Color(0xFFF6F7F6), // White text color
                            fontSize: isMobile ? 18 : 22, // Adjust font size for mobile
                            fontWeight: FontWeight.w400,
                          ),
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
          // Footer section (mobile and desktop)
          isMobile ? FooterMobile() : Footer(),
        ],
      ),
    );
  }
}
