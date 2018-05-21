INSERT INTO profile 
    (id, name, description)
VALUES 
    (1, "P1", "Ramps up to 100% power and keeps that level for 100% of the roast time, producing the quickest roast"),
    (2, "P2", "Ramps up at 100% for the first 60% of roasting time, then drops to 70% for the next 30% of time; full power remainder of roast"),
    (3, "P3", "During the first 30% of time roasts at 70% power, 80% power during the next 35% of time; full power during the remainder of roast"),
    (4, "P4", "During the first 30% of time roasts at 70% of power, 85% power during the next 30% of time; full power during the remainder of roast"),
    (5, "P5", "Roast time is broken into thirds with 70%, 80% and 95% of power supplied in each segement respectively");

INSERT INTO region
    (id, name)
VALUES
    (1, "Central America"),
    (2, "South America"),
    (3, "Islands"),
    (4, "East Africa / Arabia"),
    (5, "India"),
    (6, "Indonesia");

INSERT INTO COUNTRY
    (id, name, region)
VALUES
    (1, "Mexico", 1),
    (2, "Guatemala", 1),
    (3, "Costa Rica", 1),
    (4, "Panama", 1),
    (5, "Nicaragua", 1),
    (6, "El Salvador", 1),
    (7, "Columbia", 2),
    (8, "Brazil", 2),
    (9, "Peru", 2),
    (10, "Bolivia", 2),
    (11, "Jamaica", 3),
    (12, "Hawaii", 3),
    (13, "St Helena", 3),
    (14, "Australia", 3),
    (15, "Kenya", 4),
    (16, "Ethiopia", 4),
    (17, "Tanzania", 4),
    (18, "Rwanda", 4),
    (19, "Zimbabwe", 4),
    (20, "Yemen", 4),
    (21, "Burundi", 4),
    (22, "Uganda", 4),
    (23, "Java", 6),
    (24, "Sumatra", 6),
    (25, "Sulawesi", 6),
    (26, "Papua New Guinea", 6),
    (27, "Bali", 6);

INSERT INTO area
    (id, name, country)
VALUES
    (1, "Oaxca Pluma", 1),
    (2, "Chiapas", 1),
    (3, "Antigua", 2),
    (4, "Huehuetenango", 2),
    (5  "Terrazu", 3),
    (6, "Blue Mountain", 11),
    (7, "Kona", 12),
    (8, "Harrar", 16),
    (9, "Yrgecheffe", 16),
    (10, "Mandheling", 24);