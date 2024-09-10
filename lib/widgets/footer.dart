import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';

class Footer extends StatefulWidget {
  @override
  _FooterState createState() => _FooterState();
}

class _FooterState extends State<Footer> {
  // Define the Instagram URL
  final Uri instagramUrl = Uri.parse('https://www.instagram.com/swaywellnessclub/');

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity, // Full width of the screen
      decoration: BoxDecoration(color: Color(0xFF113D33)),
      child: Padding(
        padding: const EdgeInsets.symmetric(vertical: 40, horizontal: 50), // Adjust padding as needed
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Sway logo on the left
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Image.asset(
                      'assets/swaylogo.png',
                      width: 75,  // Adjust the size as needed
                      height: 25.53,
                    ),
                    SizedBox(height: 20), // Adjust spacing
                    Text(
                      'Subscribe to our newsletter',
                      style: TextStyle(
                        color: Color(0xFFF6F7F6),
                        fontSize: 14,
                        fontFamily: 'Helvetica',
                        fontWeight: FontWeight.w400,
                        height: 1.5, // Adjusted for better readability
                      ),
                    ),
                    SizedBox(height: 10), // Space between text and input field
                    Row(
                      children: [
                        Container(
                          width: 300,
                          child: TextField(
                            style: TextStyle(color: Color(0xFFF6F7F6)),
                            decoration: InputDecoration(
                              hintText: 'Enter your email',
                              hintStyle: TextStyle(color: Color(0xFFF6F7F6).withOpacity(0.7)),
                              enabledBorder: OutlineInputBorder(
                                borderSide: BorderSide(color: Color(0xFFF6F7F6), width: 1),
                              ),
                              focusedBorder: OutlineInputBorder(
                                borderSide: BorderSide(color: Color(0xFFF6F7F6), width: 1),
                              ),
                            ),
                          ),
                        ),
                        SizedBox(width: 10), // Space between input field and button
                        GestureDetector(
                          onTap: () {
                            // Add your submission logic here
                          },
                          child: Container(
                            width: 24,
                            height: 24,
                            decoration: ShapeDecoration(
                              shape: OvalBorder(
                                side: BorderSide(width: 1, color: Color(0xFFF6F7F6)),
                              ),
                            ),
                            child: Center(
                              child: Icon(
                                Icons.arrow_forward,
                                size: 16,
                                color: Color(0xFFF6F7F6),
                              ),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
                Spacer(), // Spacer to push the columns to the right

                // Columns on the right
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    SizedBox(height: 10), // Adjust initial spacing
                    SizedBox(
                      width: 109,
                      child: GestureDetector(
                        onTap: () async {
                          if (await canLaunchUrl(instagramUrl)) {
                            await launchUrl(instagramUrl);
                          } else {
                            throw 'Could not launch $instagramUrl';
                          }
                        },
                        child: Text(
                          'Instagram',
                          style: TextStyle(
                            color: Color(0xFFF6F7F6),
                            fontSize: 14,
                            fontFamily: 'Helvetica',
                            fontWeight: FontWeight.w400,
                            height: 1.5, // Adjusted spacing between lines
                          ),
                        ),
                      ),
                    ),
                    SizedBox(height: 10),
                    SizedBox(
                      width: 109,
                      child: Text(
                        'Tiktok', // Placeholder for TikTok link in the future
                        style: TextStyle(
                          color: Color(0xFFF6F7F6),
                          fontSize: 14,
                          fontFamily: 'Helvetica',
                          fontWeight: FontWeight.w400,
                          height: 1.5,
                        ),
                      ),
                    ),
                  ],
                ),
                Spacer(), // Spacer between columns

                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    SizedBox(height: 10), // Adjust initial spacing
                    SizedBox(
                      width: 200,
                      child: Text(
                        '1428 Larimer St. Denver, CO. 80202',
                        style: TextStyle(
                          color: Color(0xFFF6F7F6),
                          fontSize: 14,
                          fontFamily: 'Helvetica',
                          fontWeight: FontWeight.w400,
                          height: 1.5, // Adjusted spacing between lines
                        ),
                      ),
                    ),
                    SizedBox(height: 10),
                    SizedBox(
                      width: 200,
                      child: Text(
                        'Phone: 123.456.7890',
                        style: TextStyle(
                          color: Color(0xFFF6F7F6),
                          fontSize: 14,
                          fontFamily: 'Helvetica',
                          fontWeight: FontWeight.w400,
                          height: 1.5,
                        ),
                      ),
                    ),
                  ],
                ),
              ],
            ),
            SizedBox(height: 40), // Spacing before the bottom text
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                SizedBox(
                  width: 128,
                  child: Text(
                    'Terms and Conditions',
                    style: TextStyle(
                      color: Color(0xFF4A776D),
                      fontSize: 10,
                      fontFamily: 'Helvetica',
                      fontWeight: FontWeight.w400,
                      height: 1.5,
                    ),
                  ),
                ),
                Text(
                  '© 2024 Sway Wellness Club',
                  textAlign: TextAlign.center,
                  style: TextStyle(
                    color: Color(0xFF4A776D),
                    fontSize: 10,
                    fontFamily: 'Helvetica',
                    fontWeight: FontWeight.w400,
                    height: 1.5,
                  ),
                ),
                SizedBox(
                  width: 128,
                  child: Text(
                    'Privacy Policy',
                    textAlign: TextAlign.right,
                    style: TextStyle(
                      color: Color(0xFF4A776D),
                      fontSize: 10,
                      fontFamily: 'Helvetica',
                      fontWeight: FontWeight.w400,
                      height: 1.5,
                    ),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
