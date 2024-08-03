<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use App\Models\Comment;
use App\Models\Post;
use App\Helpers\ResponseHelpers;

class CommentController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['index', 'show']]);
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return ResponseHelpers::success(Comment::with("user")->latest()->paginate(10));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'body' => 'required|string',
            'post_id' => 'required|uuid',
        ]);
        $user = auth('api')->user();
        $post = Post::find($validated['post_id']);
        if (!$post) {
            return ResponseHelpers::badRequest();
        }
        $comment = Comment::create([
            'id' => (string) Str::uuid(),
            'body' => $validated['body'],
            'user_id' => $user->id,
            'post_id' => $post->id,
        ]);
        return ResponseHelpers::created(['comment' => $comment]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return ResponseHelpers::success(Comment::with("comments")->find($id));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'body' => 'string',
            'post_id' => 'required|uuid|exists:posts,id',
            'user_id' => 'uuid|exists:users,id'
        ]);

        $user = auth('api')->user();
        $comment = Comment::findOrFail($id);
        $post = Post::findOrFail($validated['post_id']);

        if ($comment->user_id != $user->id || $user->id != $validated['user_id']) {
            return ResponseHelpers::unauthorized();
        }

        if ($comment->post_id != $post->id ) {
            return ResponseHelpers::badRequest();
        }
        $comment->update($validated);
        return ResponseHelpers::success($comment);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $coment = Comment::findOrFail($id);
        $user = auth('api')->user();
        if ($user->id != $coment->user_id)
            ResponseHelpers::unauthorized();
        $coment->delete();
        return ResponseHelpers::success(null, 'Delete Post');
    }
}
