import 'package:flutter/material.dart';
import 'package:flutter_starter/api_services/posts_service.dart';
import 'package:flutter_starter/schemas/post.dart';

class Posts extends StatefulWidget {
  const Posts({super.key});
  @override
  State<Posts> createState() => _PostsState();
}

class _PostsState extends State<Posts> {
  final PostsService _postsService = PostsService();
  late Future<List<PostItem>> _postsFuture;

  @override
  void initState() {
    super.initState();
    _postsFuture = _postsService.fetchPosts();
  }

  Future<void> _refresh() async {
    final posts = await _postsService.fetchPosts();
    setState(() {
      _postsFuture = Future.value(posts);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: FutureBuilder<List<PostItem>>(
        future: _postsFuture,
        builder: (context, snapshot) {
          if (snapshot.hasData) {
            final posts = snapshot.data!;
            return RefreshIndicator(
              onRefresh: _refresh,
              child: ListView.builder(
                padding: const EdgeInsets.symmetric(
                  vertical: 8,
                  horizontal: 12,
                ),
                itemCount: posts.length,
                itemBuilder: (context, index) {
                  final post = posts[index];
                  return Card(
                    margin: const EdgeInsets.symmetric(vertical: 6),
                    elevation: 3,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(10),
                    ),
                    child: ListTile(
                      contentPadding: const EdgeInsets.symmetric(
                        vertical: 8,
                        horizontal: 16,
                      ),
                      leading: CircleAvatar(
                        backgroundColor: Colors.blue.shade700,
                        child: Text(
                          post.id.toString(),
                          style: const TextStyle(color: Colors.white),
                        ),
                      ),
                      title: Text(
                        post.title,
                        style: const TextStyle(
                          fontWeight: FontWeight.bold,
                          fontSize: 16,
                        ),
                      ),
                      subtitle: Text(
                        post.body,
                        maxLines: 2,
                        overflow: TextOverflow.ellipsis,
                      ),
                    ),
                  );
                },
              ),
            );
          } else if (snapshot.hasError) {
            return Center(
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Text(
                  'Error: ${snapshot.error}',
                  style: const TextStyle(color: Colors.red),
                ),
              ),
            );
          } else {
            return const Center(child: CircularProgressIndicator());
          }
        },
      ),
    );
  }
}
