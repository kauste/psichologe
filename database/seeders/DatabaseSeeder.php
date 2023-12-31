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
            'email' => 'r.stasioniene@gmail.com',
            'telephone_number'=> '61212345',
            'facebook'=> 'https://www.facebook.com/romalda.stasioniene',
            'linkedin' => 'https://www.linkedin.com/in/romalda-stasioniene-a26167212/',
            'about_me' => 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla, nam. Obcaecati, cum laboriosam. Sunt, tempore at porro eligendi perspiciatis odit doloremque beatae impedit consequatur totam maiores dicta, ratione doloribus nulla repellendus ex sequi pariatur dolorum nam consectetur cum nostrum accusamus. Molestias numquam sapiente magnam quod libero modi dicta unde temporibus ipsam sint corporis quaerat quam dolorum totam eos velit id optio in, ex quo ad dolor est fugit? Dolores odit expedita est libero optio asperiores explicabo neque, laboriosam obcaecati at blanditiis itaque ut eligendi! Quod voluptas eveniet tempora molestiae, modi nam laboriosam sapiente minus optio odio at molestias fugit culpa.'
        ]);
        foreach(range(1, 5) as $i){
            DB::table('first_pg_images')->insert([
                'first_page_id' => 1,
                'is_right' => $i < 3 ? 1 : 0,
                'picture_path'=> 'psichologe_alytuje_'. $i . '.webp',
            ]);
        }
        foreach(range(1, 10) as $key => $_){
            DB::table('education')->insert([
                'first_page_id' => 1,
                'date' => $key . ': ' .rand(2000, 2020) . 'm. sausis - ' . rand(2020, 2023) . ' m. gruodis',
                'about_education'=> "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa dolores cumque accusamus neque aut v.Lorem ipsum dolor sit amet consectetur adipisicin.",
            ]);
        }
        foreach(range(1, 10) as $_){
            DB::table('works')->insert([
                'first_page_id' => 1,
                'date' => rand(2000, 2020) . 'm. sausis - ' . rand(2020, 2023) . ' m. gruodis',
                'about_work'=> 'dolor sit amet consectetur adipisicing elit. Nulla, nam. Obcaecati, cum laboriosam. Sunt, tempore at porro eligendi perspiciatis odit dolo.',
            ]);
        }
    }
}
