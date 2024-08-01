<?php

namespace App\Http\Controllers;

use App\Helpers\ResponseHelpers;
use Illuminate\Http\Request;
use App\Http\Resources\PostResource;
use App\Models\Post;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class PostController extends Controller
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
        return ResponseHelpers::success(PostResource::collection(Post::with("user")->latest()->paginate(10)));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'body' => 'required|string',
        ]);

        $user = Auth::user();

        $post = Post::create([
            'id' => (string) Str::uuid(),
            'title' => $validated['title'],
            'body' => $validated['body'],
            'user_id' => $user->id,
        ]);
        return ResponseHelpers::created(PostResource::collection($post));
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return ResponseHelpers::success(PostResource::collection(Post::with("comments")->find($id)));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'title' => 'string|max:255',
            'body' => 'string',
            'user_id' => 'uuid|exists:users,id',
        ]);
        $user = Auth::user();
        if ($user->id != $validated['user_id'])
            ResponseHelpers::unauthorized();
        $post = Post::findOrFail($id);
        $post->update($validated);
        return ResponseHelpers::success(PostResource::collection($post));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $post = Post::findOrFail($id);
        $user = Auth::user();
        if ($user->id != $post->user_id)
            ResponseHelpers::unauthorized();
        $post->delete();
        return ResponseHelpers::success(null, 'Delete Post');
    }
}
