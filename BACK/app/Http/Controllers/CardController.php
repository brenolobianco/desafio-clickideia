<?php

namespace App\Http\Controllers;

use App\Models\Card;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CardController extends Controller
{
    public function index()
    {
        $cards = Card::all();

        return response()->json($cards);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'titulo' => 'required',
            'conteudo' => 'required',
            'lista' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => 'Dados inválidos'], 400);
        }

        $card = Card::create($request->all());

        return response()->json($card, 201);
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'titulo' => 'required',
            'conteudo' => 'required',
            'lista' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => 'Dados inválidos'], 400);
        }

        $card = Card::find($id);

        if (!$card) {
            return response()->json(['error' => 'Card não encontrado'], 404);
        }

        $card->update($request->all());

        return response()->json($card);
    }

    public function destroy($id)
    {
        $card = Card::find($id);

        if (!$card) {
            return response()->json(['error' => 'Card não encontrado'], 404);
        }

        $card->delete();

        $cards = Card::all();

        return response()->json($cards);
    }
}
