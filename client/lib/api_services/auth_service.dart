import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import "package:http/http.dart" as http;
import 'package:jwt_decoder/jwt_decoder.dart';

class AuthService {
  final storage = FlutterSecureStorage();
  final String authKey = "auth_key";
  Future<void> login() async {
    // TODO: implement login
  }
  Future<void> register() async {
    // TODO: implement register
  }
  Future<void> logout() async {
    // TODO: implement logout
  }
  Future<bool> isLoggedIn() async {
    bool isLoggedIn = await storage.containsKey(key: authKey);
    if (!isLoggedIn) {
      return false;
    }
    String? token = await storage.read(key: authKey);
    if (token == null) {
      return false;
    }
    Map<String, dynamic> decodedToken = JwtDecoder.decode(token);
    if (decodedToken["exp"] < DateTime.now().millisecondsSinceEpoch / 1000) {
      return false;
    }
    return true;
  }

  String? validateEmail(String? value) {
    if (value == null || value.isEmpty) {
      return "Email can't be empty";
    }
    bool emailValid = RegExp(
      r"^[a-zA-Z0-9.a-zA-Z0-9.!#$%&'*+-/=?^_`{|}~]+@[a-zA-Z0-9]+\.[a-zA-Z]+",
    ).hasMatch(value);
    if (emailValid) {
      return null;
    }
    return "Invalid email";
  }

  String? validatePassword(String? value) {
    if (value == null || value.isEmpty) {
      return "Password can't be empty";
    }
    if (value.length < 8) {
      return "Password must be at least 8 characters long";
    }
    return null;
  }

  String? validateName(String? value) {
    if (value == null) {
      return "Name can't be empty";
    }
    if (value.isEmpty) {
      return "Name can't be empty";
    }
    RegExp regex = RegExp(r'^[a-z A-Z]+$');
    if (!regex.hasMatch(value)) {
      return 'Enter a valid name';
    }
    return null;
  }
}
