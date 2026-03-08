import "package:http/http.dart" as http;
import 'dart:convert' as convert;
import 'package:flutter_starter/schemas/post.dart';

class PostsService {
  Future<List<PostItem>> fetchPosts() async {
    final response = await http.get(
      Uri.parse('https://jsonplaceholder.typicode.com/posts'),
    );
    if (response.statusCode == 200) {
      // jsonDecode returns a dynamic, but the API returns a JSON array
      final List<dynamic> jsonList =
          convert.jsonDecode(response.body) as List<dynamic>;
      return jsonList
          .map((post) => PostItem.fromJson(post as Map<String, dynamic>))
          .toList();
    } else {
      throw Exception('Failed to load posts');
    }
  }
}
