--
-- PostgreSQL database dump
--

-- Dumped from database version 12.4 (Debian 12.4-1.pgdg100+1)
-- Dumped by pg_dump version 12.4 (Debian 12.4-1.pgdg100+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: links; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.links (
    "userID" integer,
    "linkID" integer NOT NULL,
    "linkTitle" text NOT NULL,
    link text NOT NULL
);


ALTER TABLE public.links OWNER TO postgres;

--
-- Name: links_linkID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."links_linkID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."links_linkID_seq" OWNER TO postgres;

--
-- Name: links_linkID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."links_linkID_seq" OWNED BY public.links."linkID";


--
-- Name: links linkID; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.links ALTER COLUMN "linkID" SET DEFAULT nextval('public."links_linkID_seq"'::regclass);


--
-- Name: links links_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.links
    ADD CONSTRAINT links_pkey PRIMARY KEY ("linkID");


--
-- Name: links links_userID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.links
    ADD CONSTRAINT "links_userID_fkey" FOREIGN KEY ("userID") REFERENCES public.users("userID");


--
-- PostgreSQL database dump complete
--