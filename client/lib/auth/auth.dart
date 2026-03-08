import 'package:flutter/material.dart';
import 'package:flutter_starter/auth/login.dart';
import 'package:flutter_starter/auth/signup.dart';

class Auth extends StatefulWidget {
  const Auth({super.key});

  @override
  State<Auth> createState() => _AuthState();
}

class _AuthState extends State<Auth> {
  final int length = 2;
  final Widget child = const TabBarView(children: [Login(), Signup()]);
  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: length,
      animationDuration: const Duration(seconds: 1),
      initialIndex: 0,
      child: Scaffold(
        body: child,
        appBar: const TabBar(
          tabs: [
            Tab(icon: Icon(Icons.login)),
            Tab(icon: Icon(Icons.app_registration)),
          ],
        ),
      ),
    );
  }
}
