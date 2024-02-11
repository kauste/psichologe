<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use DB;
use Illuminate\Support\Facades\Hash;


class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            'name' => 'Romalda',
            'email' => 'r.stasioniene@gmail.com',
            'password' => Hash::make('123'),
            'role' => 7,
        ]);
        DB::table('first_pages')->insert([
            'user_id' => 1,
            'about_me' => 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla, nam. Obcaecati, cum laboriosam. Sunt, tempore at porro eligendi perspiciatis odit doloremque beatae impedit consequatur totam maiores dicta, ratione doloribus nulla repellendus ex sequi pariatur dolorum nam consectetur cum nostrum accusamus. Molestias numquam sapiente magnam quod libero modi dicta unde temporibus ipsam sint corporis quaerat quam dolorum totam eos velit id optio in, ex quo ad dolor est fugit? Dolores odit expedita est libero optio asperiores explicabo neque, laboriosam obcaecati at blanditiis itaque ut eligendi! Quod voluptas eveniet tempora molestiae, modi nam laboriosam sapiente minus optio odio at molestias fugit culpa.'
        ]);
        $citations = [
            ['citation' => 'Labiausiai reikia meilės tiems, kuriuos sunkiausia mylėti'],
            ['citation' => 'Kartais tenka ilgai eiti duobėtu keliu, kol pagaliau supranti, kad priėjai kalno papėdę.',
            'author' => 'Aš'],
            ['citation' => 'Absoliučiai laisvas tampi tik tuomet, kai prisiimi atsakomybę už savo gyvenimą.'],
            ['citation' => 'Jei eini per pragarą, nėra prasmė sustoti.'],
        ];
        foreach($citations as $key => $citation){
            DB::table('citations')->insert([
                'citation' => $citation['citation'] ,
                'author' => $citation['author'] ?? null,
            ]);
        }
        DB::table('contacts')->insert([
            'email' => 'r.stasioniene@gmail.com',
            'telephone_number'=> '61212345',
            'facebook'=> 'https://www.facebook.com/romalda.stasioniene',
            'linkedin' => 'https://www.linkedin.com/in/romalda-stasioniene-a26167212/',
        ]);
        foreach(range(1, 10) as $key => $_){
            DB::table('education')->insert([
                'first_page_id' => 1,
                'date' => $key . ': ' .rand(2000, 2020) . 'm. sausis - ' . rand(2020, 2023) . ' m. gruodis',
                'about'=> "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa dolores cumque accusamus neque aut v.Lorem ipsum dolor sit amet consectetur adipisicin.",
            ]);
        }
        foreach(range(1, 10) as $_){
            DB::table('works')->insert([
                'first_page_id' => 1,
                'date' => rand(2000, 2020) . 'm. sausis - ' . rand(2020, 2023) . ' m. gruodis',
                'about'=> 'dolor sit amet consectetur adipisicing elit. Nulla, nam. Obcaecati, cum laboriosam. Sunt, tempore at porro eligendi perspiciatis odit dolo.',
            ]);
        }
        $tags = ['Tevyste', 'Priklausomybes', 'Sąmoningumas', 'Vaikai', 'Karjera'];
        foreach($tags as $tag){
            DB::table('article_tags')->insert([
                'tag' => $tag
            ]);
        }
        $art = ['dolor sit amet consectetur adipisicing elit. Nulla, nam. Obcaecati, cum laboriosam. Sunt, tempore at porro eligendi perspiciatis odit dolo. dolor sit amet consectetur adipisicing elit. Nulla, nam. Obcaecati, cum laboriosam. Sunt, tempore at porro eligendi perspiciatis odit dolo. dolor sit amet consectetur adipisicing elit. Nulla, nam. Obcaecati, cum laboriosam. Sunt, tempore at porro eligendi perspiciatis odit dolo.',
                'dolor sit amet consectetur adipisicing elit. Nulla, nam. Obcaecati, cum laboriosam. Sunt, tempore at porro eligendi perspiciatis odit dolo.',
                'dolor sit amet consectetur adipisicing elit. Nulla, nam. Obcaecati, cum laboriosam. Sunt, tempore at porro eligendi perspiciatis odit dolo.dolor sit amet consectetur adipisicing elit. Nulla, nam. Obcaecati, cum laboriosam. Sunt, tempore at porro eligendi perspiciatis odit dolo.dolor sit amet consectetur adipisicing elit. Nulla, nam. Obcaecati, cum laboriosam. Sunt, tempore at porro eligendi perspiciatis odit dolo.',
                'dolor sit amet consectetur adipisicing elit. Nulla, nam. Obcaecati, cum laboriosam. Sunt, tempore at porro eligendi perspiciatis odit dolo.dolor sit amet consectetur adipisicing elit. Nulla, nam. Obcaecati, cum laboriosam. Sunt, tempore at porro eligendi perspiciatis odit dolo.', 
                'dolor sit amet consectetur adipisicing elit. Nulla, nam. Obcaecati, cum laboriosam. Sunt, tempore at porro eligendi perspiciatis odit dolo.dolor sit amet consectetur adipisicing elit. Nulla, nam. Obcaecati, cum laboriosam. Sunt, tempore at porro eligendi perspiciatis odit dolo.dolor sit amet consectetur adipisicing elit. Nulla, nam. Obcaecati, cum laboriosam. Sunt, tempore at porro eligendi perspiciatis odit dolo.dolor sit amet consectetur adipisicing elit. Nulla, nam. Obcaecati, cum laboriosam. Sunt, tempore at porro eligendi perspiciatis odit dolo.dolor sit amet consectetur adipisicing elit. Nulla, nam. Obcaecati, cum laboriosam. Sunt, tempore at porro eligendi perspiciatis odit dolo.dolor sit amet consectetur adipisicing elit. Nulla, nam. Obcaecati, cum laboriosam. Sunt, tempore at porro eligendi perspiciatis odit dolo.dolor sit amet consectetur adipisicing elit. Nulla, nam. Obcaecati, cum laboriosam. Sunt, tempore at porro eligendi perspiciatis odit dolo.dolor sit amet consectetur adipisicing elit. Nulla, nam. Obcaecati, cum laboriosam. Sunt, tempore at porro eligendi perspiciatis odit dolo.dolor sit amet consectetur adipisicing elit. Nulla, nam. Obcaecati, cum laboriosam. Sunt, tempore at porro eligendi perspiciatis odit dolo.',
                'dolor sit amet consectetur adipisicing elit. Nulla, nam. Obcaecati, cum laboriosam. Sunt, tempore at porro eligendi perspiciatis odit dolo.dolor sit amet consectetur adipisicing elit. Nulla, nam. Obcaecati, cum laboriosam. Sunt, tempore at porro eligendi perspiciatis odit dolo.'];
        $articles = [
            [
                'title' => 'Asmenybės sutrikimai',
                'youtube' => 'A2QuDg8zSxM?si=0_rv4c2_F8lfjniu',
                'article' => json_encode($art),
            ],
            [
                'title' => 'Pozityvi tėvyste',
                'article' => json_encode($art),
                'link' => json_encode(['title' => 'Skaityti spaudoje', 'link' => 'https://rugile.website/']),
                'img_1' => json_encode(['path' => 'one.jpg', 'paragraph_before' => 1, 'author' => 'Rugilė Stasionytė', 'extra_data' => 'Nuotraukoje pavaizduotas pozityios tėvystės modelis']),
                'img_2' =>json_encode( ['path' => 'two.jpg', 'paragraph_before' => 3, 'author' => 'Rugilė Stasionytė', 'extra_data' => 'Nuotraukoje pavaizduotas pozityios tėvystės modelis']),
                'img_3' => json_encode(['path' => 'three.jpg', 'paragraph_before' => 4, 'author' => 'Rugilė Stasionytė', 'extra_data' => 'Nuotraukoje pavaizduotas pozityios tėvystės modelis']),
            ],
            [
                'title' => 'Sąmoninga tėvyste',
                'article' => json_encode($art),
                'link' => json_encode(['title' => 'Skaityti spaudoje', 'link' => 'https://rugile.website/']),
                'img_1' => json_encode(['path' => 'one.jpg', 'paragraph_before' => 2,  'author' => 'Rugilė Stasionytė', 'extra_data' => 'Nuotraukoje pavaizduotas pozityios tėvystės modelis']),
                'img_2' => json_encode(['path' => 'two.jpg', 'paragraph_before' => 3, 'author' => 'Rugilė Stasionytė', 'extra_data' => 'Nuotraukoje pavaizduotas pozityios tėvystės modelis']),
            ],
            [
                'title' => 'Mindfullness mokymasis',
                'article' => json_encode($art),
                'link' => json_encode(['title' => 'Skaityti spaudoje', 'link' => 'https://rugile.website/']),
                'img_1' => json_encode(['path' => 'one.jpg', 'paragraph_before' => 4, 'author' => 'Rugilė Stasionytė', 'extra_data' => 'Nuotraukoje pavaizduotas pozityios tėvystės modelis']),
            ],
            [
                'title' => 'Išsivaduoti iš priklaudomybės pančių',
                'article' => json_encode($art),
                'link' => json_encode(['title' => 'Skaityti spaudoje', 'link' => 'https://rugile.website/']),

            ],
            [
                'title' => 'Skirybos',
                'article' => json_encode($art)
            ],
            [
                'title' => 'Dėmesingo įsisąmoninimo praktikos',
                'article' => json_encode($art)
            ],
            [
                'title' => 'Antras puslapis',
                'article' => json_encode($art)
            ],
            [
                'title' => 'Antras puslapis',
                'article' => json_encode($art)
            ],
            [
                'title' => 'Antras puslapis',
                'article' => json_encode($art)
            ],
            [
                'title' => 'Antras puslapis',
                'article' => json_encode($art)
            ],
            [
                'title' => 'Antras puslapis',
                'article' => json_encode($art)
            ],
            [
                'title' => 'Antras puslapis',
                'article' => json_encode($art)
            ],
            [
                'title' => 'Trecias puslapis',
                'article' => json_encode($art)
            ],
            [
                'title' => 'Trecias puslapis',
                'article' => json_encode($art)
            ],
            [
                'title' => 'Trecias puslapis',
                'article' => json_encode($art)
            ],
            [
                'title' => 'Trecias puslapis',
                'article' => json_encode($art)
            ],
            [
                'title' => 'Trecias puslapis',
                'article' => json_encode($art)
            ],
            [
                'title' => 'Trecias puslapis',
                'article' => json_encode($art)
            ],
            

            
        ];
        foreach($articles as $article){
            DB::table('articles')->insert([
                'title' => $article['title'],
                'youtube' => $article['youtube'] ?? null,
                'article' => $article['article'],
                'link' => $article['link'] ?? null,
                'img_1' => $article['img_1'] ?? null,
                'img_2' => $article['img_2'] ?? null,
                'img_3' => $article['img_3'] ?? null,
            ]);
        }

    }
}
